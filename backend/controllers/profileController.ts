import { Request, Response } from 'express';
import { Profile, IProfile } from '../models/profileModel';
import mongoose from 'mongoose';

const getProfiles = async (req: Request, res: Response): Promise<void> => {
    try {
      const profiles: IProfile[] = await Profile.find();
      res.status(200).json({ profiles });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
};

const getProfile = async (req: Request, res: Response) => {
    try {
        const profile = await Profile.findById(req.params.id);
        res.status(200).json({ profile });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const createProfile = async (req: Request, res: Response) => {
    try {
        const profile = new Profile({
            profilePicture: req.body.profilePicture,
            name: req.body.name,
            bio: req.body.bio,
            region: req.body.region,
            language: req.body.language,
            stars: req.body.stars,
            games: req.body.games,
          });
          
          await profile.save();
        res.status(201).json({ profile });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

const deleteProfile = async (req: Request, res: Response) => {
    try {
        await Profile.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Profile deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

const updateProfile = async (req: Request, res: Response) => {
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ profile: updatedProfile });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

export default {    
    getProfiles,
    getProfile,
    createProfile,
    deleteProfile,
    updateProfile,
};