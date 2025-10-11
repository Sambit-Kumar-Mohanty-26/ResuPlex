import { Router } from 'express';
import { prisma } from '../db/index.js';
import authMiddleware from '../middleware/authMiddleware.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import type { Prisma } from '@prisma/client';

const router = Router();

router.use(authMiddleware);

router.get('/', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    const resumes = await prisma.resume.findMany({
      where: { userId: userId },
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

    const newResume = await prisma.resume.create({
      data: {
        title: 'Untitled Resume',
        user: { connect: { id: userId } },
        contact: {},
        summary: '',
        experience: { create: [] },
        education: { create: [] },
        skills: { create: [] },
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
    const resumeId = req.params.id;

    if (!resumeId) {
      return res.status(400).json({ error: 'Resume ID is required.' });
    }

    const resume = await prisma.resume.findFirst({
      where: {
        id: resumeId, 
        userId: userId,
      },
      include: {
        experience: true,
        education: true,
        skills: true,
      },
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

router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const resumeId = req.params.id;
    const resumeData = req.body;

    if (!resumeId) {
      return res.status(400).json({ error: 'Resume ID is required.' });
    }

    const existingResume = await prisma.resume.findFirst({
      where: {
        id: resumeId, 
        userId: userId,
      },
    });

    if (!existingResume) {
      return res.status(404).json({ error: 'Resume not found or you do not have permission to edit it.' });
    }

    const updatedResume = await prisma.$transaction(async (tx) => {
      await tx.workExperience.deleteMany({ where: { resumeId } });
      await tx.education.deleteMany({ where: { resumeId } });
      await tx.skill.deleteMany({ where: { resumeId } });

      const resume = await tx.resume.update({
        where: { id: resumeId },
        data: {
          title: resumeData.title,
          summary: resumeData.summary,
          contact: resumeData.contact as Prisma.JsonObject, 
          experience: {
            create: resumeData.experience.map(({ id, ...exp }: any) => exp),
          },
          education: {
            create: resumeData.education.map(({ id, ...edu }: any) => edu),
          },
          skills: {
            create: resumeData.skills.map(({ id, ...skill }: any) => skill),
          },
        },
        include: {
          experience: true,
          education: true,
          skills: true,
        },
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
    const resumeId = req.params.id;

    if (!resumeId) {
      return res.status(400).json({ error: 'Resume ID is required.' });
    }

    const resumeToDelete = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId: userId,
      },
    });

    if (!resumeToDelete) {
      return res.status(404).json({ error: 'Resume not found or you do not have permission to delete it.' });
    }

    await prisma.resume.delete({
      where: { id: resumeId }, 
    });

    res.status(204).send();
  } catch (error) {
    console.error(`Failed to delete resume ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
});

export default router;