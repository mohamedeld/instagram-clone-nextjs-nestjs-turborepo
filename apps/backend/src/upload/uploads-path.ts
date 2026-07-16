import { existsSync } from 'fs';
import { dirname, join } from 'path';

const PROJECT_ROOT_MARKER = 'nest-cli.json';

const findBackendRoot = (startDir: string): string => {
  let currentDir = startDir;

  while (true) {
    if (existsSync(join(currentDir, PROJECT_ROOT_MARKER))) {
      return currentDir;
    }

    const parentDir = dirname(currentDir);
    if (parentDir === currentDir) {
      return startDir;
    }

    currentDir = parentDir;
  }
};

export const getUploadsRootPath = (): string => {
  const backendRoot = findBackendRoot(__dirname);
  return join(backendRoot, 'uploads');
};

export const getUploadsImagesPath = (): string => {
  return join(getUploadsRootPath(), 'images');
};
