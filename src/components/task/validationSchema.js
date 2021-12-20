import * as yup from 'yup'

export const storyPointsSchema = yup.string().nullable()

export const titleSchema = yup.string().required().trim().min(2).max(50)

export const descriptionSchema = yup.string().nullable()

export const taskSchema = yup.object().shape({
    title: titleSchema,
    storyPoints: storyPointsSchema,
    description: descriptionSchema,
})
