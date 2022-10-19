import type {PrismaClient} from '@prisma/client';
import type {DeepMockProxy} from 'jest-mock-extended';
import {mockDeep, mockReset} from 'jest-mock-extended';
import {prisma} from '../utils/prismaSingleton';

jest.mock('../utils/prismaSingleton', () => ({
	__esModule: true,
	default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
	mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
