import loginPage from "../support/loginPage";
import loginData from "../fixtures/loginData.json";

describe ('Verifikasi proses login pada website OrangeHRM', () => {
  it('TC_001 - Login dengan username dan password valid', () => {
    loginPage.visit()
    loginPage.enterUsername(loginData.validUsername)
    loginPage.enterPassword(loginData.validPassword)
    loginPage.clickLogin()
    loginPage.assertionLogin()
  })

  it('TC_002 - Login dengan username dan password yang belum terdaftar', () => {
    loginPage.visit()
    loginPage.enterUsername(loginData.usernameNotRegistered)
    loginPage.enterPassword(loginData.passwordNotRegistered)
    loginPage.clickLogin()
    loginPage.errorMessage()
  })

  it('TC_003 - Login dengan username menggunakan huruf kecil dan password valid', () => {
    loginPage.visit()
    loginPage.enterUsername(loginData.lowercaseUsername)
    loginPage.enterPassword(loginData.validPassword)
    loginPage.clickLogin()
    loginPage.errorMessage()
  })

  it('TC_004 - Login dengan username valid dan password menggunakan huruf besar', () => {
    loginPage.visit()
    loginPage.enterUsername(loginData.validUsername)
    loginPage.enterPassword(loginData.uppercasePassword)
    loginPage.clickLogin()
    loginPage.errorMessage()
  })

  it('TC_005 - Login dengan invalid username dan valid password', () => {
    loginPage.visit()
    loginPage.enterUsername(loginData.invalidUsername)
    loginPage.enterPassword(loginData.validPassword)
    loginPage.clickLogin()
    loginPage.errorMessage()
  })

  it('TC_006 - Login dengan valid username dan invalid password', () => {
    loginPage.visit()
    loginPage.enterUsername(loginData.validUsername)
    loginPage.enterPassword(loginData.invalidPassword)
    loginPage.clickLogin()
    loginPage.errorMessage()
  })

  it('TC_007 - Login tanpa menginputkan username', () => {
    loginPage.visit()
    loginPage.enterPassword(loginData.validPassword)
    loginPage.clickLogin()
    loginPage.requiredMessage()
  })

  it('TC_008 - Login tanpa menginputkan password', () => {
    loginPage.visit()
    loginPage.enterUsername(loginData.validUsername)
    loginPage.clickLogin()
    loginPage.requiredMessage()
  })

  it('TC_009 - Login tanpa menginputkan username dan password', () => {
    loginPage.visit()
    loginPage.clickLogin()
    loginPage.requiredMessage()
  })

  it('TC_010 - Login dengan menginputkan spasi (whitespace) pada field username', () => {
    loginPage.visit()
    loginPage.enterUsername(loginData.whiteSpaceUsername)
    loginPage.enterPassword(loginData.validPassword)
    loginPage.clickLogin()
    loginPage.requiredMessage()
  })

  it('TC_011 - Login dengan menginputkan spasi (whitespace) pada field password', () => {
    loginPage.visit()
    loginPage.enterUsername(loginData.validUsername)
    loginPage.enterPassword(loginData.whiteSpacePassword)
    loginPage.clickLogin()
    loginPage.requiredMessage()
  })

  it('TC_012 - Login dengan memberikan spasi di awal dan di akhir pada inputan field username', () => {
    loginPage.visit()
    loginPage.enterUsername(loginData.leadingTrailingUsernamme)
    loginPage.enterPassword(loginData.validPassword)
    loginPage.clickLogin()
    loginPage.errorMessage()
  })

  it('TC_013 - Login dengan memberikan spasi di awal dan di akhir pada inputan field password', () => {
    loginPage.visit()
    loginPage.enterUsername(loginData.validUsername)
    loginPage.enterPassword(loginData.leadingTrailingPassword)
    loginPage.clickLogin()
    loginPage.errorMessage()
  })
})