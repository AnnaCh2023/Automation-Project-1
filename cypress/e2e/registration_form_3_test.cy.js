

beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})


//BONUS TASK: add visual tests for registration form 3
//Task list:
//Create tests to verify visual parts of the page:
    
describe('Bonus task, visual tests', () => {

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that ckeckboxes list is correct', () => {
        // Array of found elements with given selector has 2 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 2)

        //Verify default state of checkbox buttons
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')

        // Selecting one will NOT remove selection from other ckeckbox button
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    })

    it('Check that the link is active', () => {
        cy.get('button a[href="cookiePolicy.html"]').should('have.attr', 'href', 'cookiePolicy.html')
            .click()

        // Go back to previous page
        cy.go('back')
        cy.log('Back again to registration form 3')
    })

    // Dropdown and dependencies between 2 dropdowns
    it('Verify the email format', () => {
        // Valid email address
        cy.get('input[name="email"]').type('anna@example.com')
        cy.get('input[name="email"]').blur()
        // Check if the error message for invalid email address is not displayed
        cy.get('#emailAlert span[ng-show="myForm.email.$error.email"]').should('not.be.visible')
    
        // Invalid email address
        cy.get('input[name="email"]').clear().type('invalid-email')
        cy.get('input[name="email"]').blur()
        // Check if the error message for invalid email address is displayed
        cy.get('#emailAlert span[ng-show="myForm.email.$error.email"]').should('be.visible').should('contain', 'Invalid email address.')
      })

      it('Select a country and verify city options', () => {
        // Select a country from the first dropdown
        cy.get('#country').select('Estonia')

        // Verify that the second dropdown has the correct options based on the selected country
        cy.get('#city').should('have.descendants', 'option')
        cy.get('#city option').should('have.length', 4) //In the dropdown 1 option is blank
        cy.get('#city').should('contain', 'Tallinn')
        cy.get('#city').should('contain', 'Haapsalu')
        cy.get('#city').should('contain', 'Tartu')
      });

    

// BONUS TASK: add functional tests for registration form 3
// Task list:
// Create second test suite for functional tests
// Create tests to verify logic of the page:
    // all fields are filled in + validation
    // only mandatory fields are filled in + validations
    // mandatory fields are absent + validations (try using function)
    // If city is already chosen and country is updated, then city choice should be removed
    // add file (google yourself for solution)
      
    it.only('should successfully submit the form with valid data', () => {
          // Fill in the form fields with valid data
        cy.get('#name').type('John Doe')
        cy.get('input[name="email"]').type('johndoe@example.com')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('input[name="birthday"]').type('1990-01-01')
        cy.get('input[name="freq"][value="Weekly"]').check()
        cy.get('input[type="checkbox"]').check()
      
          // Submit the form
        cy.get('form[name="myForm"] input[type="submit"]').click({ multiple: true })
    })
})