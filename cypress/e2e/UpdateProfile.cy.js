describe("AddVinylSpec", () => {
  const baseUrl = "http://localhost:3000";

  before(() => {
    // Register a new user
    cy.visit(`${baseUrl}/Register`);
    cy.get('[data-cy="input-username"]').type("Monke");
    cy.get('[data-cy="input-email"]').type("Monke@gmail.com");
    cy.get('[data-cy="input-password"]').type("Monke");
    cy.get('[data-cy="register-button"]').click();

    cy.url().should('eq', `${baseUrl}/`);
  });

  it("should go and login the profile", () => {
    cy.url().should('eq', `${baseUrl}/Login`);

    cy.get('[data-cy="input-username"]').type("Monke");
    cy.get('[data-cy="input-password"]').type("Monke");
    cy.get('[data-cy="login-button"]').click();

  });


it("should go and update the profile", () => {
  // Navigating to the Vinyls page where the form is located
  cy.visit(`${baseUrl}/Profile`);

  cy.get('[data-cy="update-profile"]').click();

  // Filling out the Artist form
  cy.get('[data-cy="balance"]').type(800);  // Artist input
  cy.get('[data-cy="bio"]').type("Hi! I am a monke");  // Description input
  
  // Submitting the form
  cy.get('[data-cy="submit-profile"]').click();  // Assuming you have a submit button with the `data-cy="submit-vinyl"`

  /// Verifying success message
    cy.contains("Profile update successfully", { timeout: 10000 }).should("be.visible");
});
});