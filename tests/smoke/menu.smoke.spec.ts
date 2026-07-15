import { SideMenu } from '../../src/screens/components/SideMenuComponent.js';

describe('Side menu smoke', () => {
  it('opens the menu and shows Login', async () => {
    await SideMenu.open();
    expect(await SideMenu.isLogInDisplayed()).toBe(true);
  });
});
