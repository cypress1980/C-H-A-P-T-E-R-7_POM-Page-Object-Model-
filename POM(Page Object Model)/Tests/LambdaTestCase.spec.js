const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../Pages/LoginPageLambdaTest.spec");
const { HomePage } = require("../Pages/HomePageLambdaTest.spec");
const { SearchPage } = require("../Pages/SearchProductLambdaTest.spec");
const {ProductCartPage} = require("../Pages/AddProductIntoCartLambdaTest.spec");

test("Login and Navigate to My Account", async ({ page }) => {
  const Login = new LoginPage(page);
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  const productIntoCart = new ProductCartPage(page);
  // Open the website
  await page.goto(
    "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
  );
  // Perform login
  await Login.enterEmail("lambdatestnew@yopmail.com");
  await Login.enterPassword("Lambda123");
  await Login.clickLoginButton();

  // Validate user logged in and seeing change your password option
  await homePage.verifyUserLoggedIn("Change your password");
  await searchPage.selectTheCategory();
  await searchPage.searchForTheProduct("iPod");
  await productIntoCart.addProductIntoCart();
  await productIntoCart.removeProductIntoCart();
});
