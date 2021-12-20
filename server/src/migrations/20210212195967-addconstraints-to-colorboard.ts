import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().addConstraint('ColorBoards', {
        fields: ['boardId'],
        name: "fk_board_colorboard_id",
        type: 'foreign key',
        references: { //Required field
            table: 'Boards',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })

    await sequelize.getQueryInterface().addConstraint('ColorBoards', {
        fields: ['colorId'],
        name: "fk_color_colorboard_id",
        type: 'foreign key',
        references: { //Required field
            table: 'Colors',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })

};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().removeColumn('ColorBoards', 'colorId');
};
