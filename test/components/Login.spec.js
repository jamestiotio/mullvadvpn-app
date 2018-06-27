// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import Login from '../../app/components/Login';

describe('components/Login', () => {

  it('does not show the footer when logging in', () => {
    const component = shallow(
      <Login { ...{ ...defaultProps,
        loginState: 'logging in'
      }} />
    );
    const visibleFooters = getComponent(component, 'footerVisibility true');
    const invisibleFooters = getComponent(component, 'footerVisibility false');
    expect(visibleFooters.length).to.equal(0);
    expect(invisibleFooters.length).to.equal(1);
  });

  it('shows the footer and account input when not logged in', () => {
    const component = shallow(
      <Login {...defaultProps} />
    );
    const visibleFooters = getComponent(component, 'footerVisibility true');
    const invisibleFooters = getComponent(component, 'footerVisibility false');
    expect(visibleFooters.length).to.equal(1);
    expect(invisibleFooters.length).to.equal(0);
    expect(getComponent(component, 'AccountInput').length).to.be.above(0);
  });

  it('does not show the footer nor account input when logged in', () => {
    const component = shallow(
      <Login {...{ ...defaultProps,
        loginState: 'ok'
      }} />
    );
    const visibleFooters = getComponent(component, 'footerVisibility true');
    const invisibleFooters = getComponent(component, 'footerVisibility false');
    expect(visibleFooters.length).to.equal(0);
    expect(invisibleFooters.length).to.equal(1);
    expect(getComponent(component, 'AccountInput').length).to.equal(0);
  });

  it('logs in with the entered account number when clicking the login icon', (done) => {
    const component = shallow(
      <Login {...defaultProps } />
    );
    component.setProps({
      accountToken: '12345',
      login: (accountToken) => {
        try {
          expect(accountToken).to.equal('12345');
          done();
        } catch (e) {
          done(e);
        }
      },
    });

    click(getComponent(component, 'account-input-button'));
  });
});

const defaultProps = {
  accountToken: null,
  accountHistory: [],
  loginError: null,
  loginState: 'none',
  openSettings: () => {},
  openExternalLink: (_type) => {},
  login: (_accountToken) => {},
  resetLoginError: () => {},
  updateAccountToken: (_accountToken) => {},
  fetchAccountTokenHistory: () => Promise.resolve(),
  removeAccountTokenFromHistory: (_accountToken) => Promise.resolve(),
};

function getComponent(container, testName) {
  return container.findWhere((n) => n.prop('testName') === testName);
}

function click(component) {
  component.prop('onPress')();
}
