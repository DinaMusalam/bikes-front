import { Ng2BikesPage } from './app.po';

describe('ng2-bikes App', function() {
  let page: Ng2BikesPage;

  beforeEach(() => {
    page = new Ng2BikesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
