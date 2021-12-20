import { DataTypes } from 'sequelize';

const mockSequelize = {};

jest.mock('../src/database', () => {
    return { sequelize: mockSequelize }
})

const modelStaticMethodMocks = {
    init: jest.fn(),
}

jest.mock('sequelize', () => {
    class MockModel {
        public static init(attributes, options) {
            modelStaticMethodMocks.init(attributes, options);
        }
    }
    return {
        ...jest.requireActual('sequelize'),
        Model: MockModel,
    };
})

describe("user", () => {
    it('should be correct', async () => {
        await import('../src/models/User')
        expect(modelStaticMethodMocks.init).toBeCalledWith(
            {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: DataTypes.UUID,
                },
                passwordHash: DataTypes.STRING,
                userName: DataTypes.STRING,
                email: DataTypes.STRING,
            },
            {
                modelName: 'User',
            },
        )
    });
})

