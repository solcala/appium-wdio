import { SideMenu } from '../../src/screens/components/SideMenuComponent.js';

describe('Side menu smoke', () => {
  it('opens the drawer and shows Log In', async () => {
    await SideMenu.open();
    expect(await SideMenu.isLogInDisplayed()).toBe(true);
  });
});
