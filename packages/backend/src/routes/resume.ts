import { Router } from 'express';
import { prisma } from '../db/index.js';
import authMiddleware from '../middleware/authMiddleware.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import type { Prisma } from '@prisma/client';
import puppeteer from 'puppeteer';

const router = Router();
router.use(authMiddleware);
router.get('/', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const resumes = await prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      select: { id: true, title: true, updatedAt: true },
    });
    res.status(200).json(resumes);
  } catch (error) {
    console.error('Failed to fetch resumes:', error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

router.post('/', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { title } = req.body;
    const newResume = await prisma.resume.create({
      data: {
        title: title || 'Untitled Resume',
        user: { connect: { id: userId } },
        contact: {},
        summary: '',
      },
    });
    res.status(201).json(newResume);
  } catch (error) {
    console.error('Failed to create resume:', error);
    res.status(500).json({ error: 'Failed to create resume' });
  }
});

router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { id: resumeId } = req.params;

    if (!resumeId) {
      return res.status(400).json({ error: 'Resume ID is required.' });
    }

    const resume = await prisma.resume.findFirst({
      where: { id: resumeId, userId },
      include: { experience: true, education: true, skills: true },
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.status(200).json(resume);
  } catch (error) {
    console.error(`Failed to fetch resume ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
});

router.get('/:id/pdf', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { id: resumeId } = req.params;

    if (!resumeId) {
      return res.status(400).json({ error: 'Resume ID is required.' });
    }

    const resume = await prisma.resume.findFirst({
      where: { id: resumeId, userId },
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found.' });
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication token is required for PDF generation.' });
    }
    
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const printUrl = `${frontendUrl}/print/${resumeId}?token=${token}`;

    console.log(`[PDF Generation]: Launching browser for URL: ${printUrl}`);

    const browser = await puppeteer.launch({
       headless: false, 
       slowMo: 250,     
       args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto(printUrl, { waitUntil: 'networkidle0' });
    await page.waitForSelector('body[data-puppeteer-ready="true"]', { timeout: 30000 });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
    });

    await browser.close();
    console.log(`[PDF Generation]: Successfully created PDF for resume ${resumeId}`);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${resume.title || 'resume'}.pdf"`);
    res.send(pdfBuffer);

  } catch (error) {
    console.error(`Failed to generate PDF for resume ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { id: resumeId } = req.params;
    const resumeData = req.body;

    if (!resumeId) {
      return res.status(400).json({ error: 'Resume ID is required.' });
    }

    const existingResume = await prisma.resume.findFirst({
      where: { id: resumeId, userId },
    });

    if (!existingResume) {
      return res.status(404).json({ error: 'Resume not found or you do not have permission to edit it.' });
    }

    const updatedResume = await prisma.$transaction(async (tx) => {
      await tx.workExperience.deleteMany({ where: { resumeId } });
      await tx.education.deleteMany({ where: { resumeId } });
      await tx.skill.deleteMany({ where: { resumeId } });
      const experienceData = resumeData.experience.map((exp: any) => ({
        jobTitle: exp.jobTitle,
        company: exp.company,
        location: exp.location,
        startDate: exp.startDate,
        endDate: exp.endDate,
        description: exp.description,
      }));

      const educationData = resumeData.education.map((edu: any) => ({
        degree: edu.degree,
        institution: edu.institution,
        location: edu.location,
        graduationDate: edu.graduationDate,
      }));

      const skillsData = resumeData.skills.map((skill: any) => ({
        name: skill.name,
      }));
      const resume = await tx.resume.update({
        where: { id: resumeId },
        data: {
          title: resumeData.title,
          summary: resumeData.summary,
          contact: resumeData.contact as Prisma.JsonObject,
          experience: {
            create: experienceData, 
          },
          education: {
            create: educationData, 
          },
          skills: {
            create: skillsData, 
          },
        },
        include: { experience: true, education: true, skills: true },
      });
      return resume;
    });

    res.status(200).json(updatedResume);
  } catch (error) {
    console.error(`Failed to update resume ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to update resume' });
  }
});

router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { id: resumeId } = req.params;

    if (!resumeId) {
      return res.status(400).json({ error: 'Resume ID is required.' });
    }

    const resumeToDelete = await prisma.resume.findFirst({
      where: { id: resumeId, userId },
    });

    if (!resumeToDelete) {
      return res.status(404).json({ error: 'Resume not found or you do not have permission to delete it.' });
    }

    await prisma.resume.delete({ where: { id: resumeId } });

    res.status(204).send();
  } catch (error) {
    console.error(`Failed to delete resume ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
});

export default router;