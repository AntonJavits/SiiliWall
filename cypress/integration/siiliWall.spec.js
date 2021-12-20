
describe('Loads landingPage', () => {
    it('loads the page', () => {
        cy.visit('/')
    })
    it('renders the title', () => {
        cy.get('#landingTitle')
    })
    it('renders the add button', () => {
        cy.get('#addButton')
    })
})

describe('A board can be added to the boardlist and rendered', () => {
    const typedtext = 'NEW BOARD'
    const shortFormText = 'NB'

    it('clicks the add board - button', () => {
        cy.get('#addButton').click()
    })
    it('focuses the first input field on load', () => {
        cy.focused().should('have.id', 'inputName')
    })
    it('accepts input', () => {
        cy.get('#inputName').type(typedtext).should('have.value', typedtext)
    })
    it('accepts input', () => {
        cy.get('#inputShortForm').type(shortFormText).should('have.value', shortFormText)
    })
    it('the add button can be clicked', () => {
        cy.get('#addBoard').click()
    })
})

describe('Navigation to the boardPage is possible', () => {
    it('pressing the created board', () => {
        cy.get('.boardList__button__link').last().click()
    })
})

describe('Column can be created and rendered', () => {
    const columnNames = ['To Do', 'In progress', 'Done']
    it('creating 3 columns for the page', () => {
        for (let i = 0; i < columnNames.length; i++) {
            cy.get('#inputColumnName').type(columnNames[i]).should('have.value', columnNames[i])
            cy.get('#addColumnButton').click()
        }
    })
})

describe('A task can be added to column and be moved to another column', () => {
    const taskName = 'Do something...'
    const ownerName = 'Ilpo'
    it('creating a new task to to do column', () => {
        cy.get('#addTaskButton').click()
        cy.get('#inputTaskName').type(taskName).should('have.value', taskName)
        cy.get('#createTaskButton').click()
    })

    it('editing task and defining a owner to it', () => {
        cy.get('#clickableTask').first().click()
        cy.get('#taskSelectOwner').click().type(`${ownerName}{enter}`)
        cy.get('#submitEditTaskButton').click()
    })
})

describe('Tasks members can be edited', () => {
    const memberName1 = 'Pauliina'
    const memberName2 = 'Katja'
    it('pressing the created task and adding a few members to it', () => {
        cy.get('#clickableTask').first().click()
        cy.get('#taskSelectMember').click().type(`${memberName1}{enter}`)
        cy.get('#taskSelectMember').click().type(`${memberName2}{enter}`)
        cy.get('#submitEditTaskButton').click()
    })
})
