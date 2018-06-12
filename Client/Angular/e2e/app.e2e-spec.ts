import { AccountSoftPage } from './app.po';

describe('account-soft App', () => {
  let page: AccountSoftPage;

  beforeEach(() => {
    page = new AccountSoftPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
