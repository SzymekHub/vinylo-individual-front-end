describe("AddVinylSpec", () => {
  const baseUrl = "http://localhost:3000";

  before(() => {
    // Logging in as Admin
    cy.visit(`${baseUrl}/Login`);
    cy.get('[data-cy="input-username"]').type("Admin");
    cy.get('[data-cy="input-password"]').type("Admin");
    cy.get('[data-cy="login-button"]').click();

    cy.url().should('eq', `${baseUrl}/`);
  });


it("should add a new Artist", () => {
  // Navigating to the Vinyls page where the form is located
  cy.visit(`${baseUrl}/Artists`);
  
  // Filling out the Artist form
  cy.get('[data-cy="artist-name"]').type("Zillakami");  // Artist input
  cy.get('[data-cy="bio"]').type("WARDOG");  // Description input
  
  // Submitting the form
  cy.get('[data-cy="submit-artist"]').click();  // Assuming you have a submit button with the `data-cy="submit-vinyl"`

  /// Verifying success message
    cy.contains("Artist created successfully", { timeout: 10000 }).should("be.visible");
});
});