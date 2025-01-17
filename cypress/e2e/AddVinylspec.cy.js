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

  it("should add a new vinyl and stay on the same page", () => {
    // Navigating to the Vinyls page where the form is located
    cy.visit(`${baseUrl}/Vinyls`);
    
    // Filling out the vinyl form
    cy.get('[data-cy="vinyl-type"]').select("LP_12_INCH");  
    cy.get('[data-cy="artist-name"]').click(); // Open the dropdown/autocomplete
    cy.contains("Mac Miller").click(); // Select the desired artist from the list
    cy.get('[data-cy="title"]').type("Ballonerism");  
    cy.get('[data-cy="speed"]').select("RPM_45");  
    cy.get('[data-cy="state"]').select("NEW");  
    cy.get('[data-cy="color"]').select("COLORED");  
    cy.get('[data-cy="is-released"]').check();  
    cy.get('[data-cy="description"]').type("A legendary album by MAC MILLER"); 
    cy.get('[data-cy="spotify-album-id"]').type("2ANFIaCb53iam0MBkFFoxY");  
    
    // Submitting the form
    cy.get('[data-cy="submit-vinyl"]').click();

    // Verifying success message
    cy.contains("Vinyl created successfully", { timeout: 10000 }).should("be.visible");
  });
});
