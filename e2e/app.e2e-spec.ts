import { AngularRestPage } from './app.po';

describe('angular-rest App', () => {
  let page: AngularRestPage;

  beforeEach(() => {
    page = new AngularRestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
