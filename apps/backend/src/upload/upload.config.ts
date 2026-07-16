import { extname } from 'path';
import { Request } from 'express';
import { diskStorage, FileFilterCallback } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { getUploadsImagesPath } from './uploads-path';

export const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
) => {
  const name = file.originalname.split('.')[0];
  const fileExName = extname(file.originalname);
  const randomName = uuidv4();
  callback(null, `${name}-${Date.now()}-${randomName}${fileExName}`);
};

export const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: any,
) => {
  // Allow only image files
  if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
    callback(new Error('Only image files are allowed'));
    return;
  }
  callback(null, true);
};

export const multerConfig = {
  storage: diskStorage({
    destination: getUploadsImagesPath(),
    filename: editFileName,
  }),
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
};
