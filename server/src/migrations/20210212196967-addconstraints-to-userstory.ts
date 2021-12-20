import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().addConstraint('UserStories', {
        fields: ['userId'],
        name: "fk_user_story_id",
        type: 'foreign key',
        references: { //Required field
            table: 'Users',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })

    await sequelize.getQueryInterface().addConstraint('UserStories', {
        fields: ['storyId'],
        name: "fk_user_story_id_2",
        type: 'foreign key',
        references: { //Required field
            table: 'Stories',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })


};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().removeColumn('UserStories', 'storyId');
    await sequelize.getQueryInterface().removeColumn('UserStories', 'userId');
};
