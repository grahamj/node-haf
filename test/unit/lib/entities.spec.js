const { expect } = require('chai');
const entities = require('../../../src/lib/entities.js');

describe('Entities singleton', () => {

  it('add throws without args', () => {
    try {
      entities.add();
    } catch(err) {
      expect(err.message).to.match(/properties of undefined/);
      return;
    }
    throw new Error('Should not succeed');
  });

  it('add throws with non-object args', () => {
    try {
      entities.add(123);
    } catch(err) {
      expect(err.message).to.match(/must be of type object/);
      return;
    }
    throw new Error('Should not succeed');
  });

  it('add throws without identifier', () => {
    try {
      entities.add({ entityId: 'string' });
    } catch(err) {
      expect(err.message).to.match(/required/);
      return;
    }
    throw new Error('Should not succeed');
  });

  it('add throws with non-string identifier', () => {
    try {
      entities.add({ identifier: 123, entityId: 'string' });
    } catch(err) {
      expect(err.message).to.match(/string/);
      return;
    }
    throw new Error('Should not succeed');
  });

  it('add throws without entityId', () => {
    try {
      entities.add({ identifier: 'string' });
    } catch(err) {
      expect(err.message).to.match(/required/);
      return;
    }
    throw new Error('Should not succeed');
  });

  it('add throws with non-string entityId', () => {
    try {
      entities.add({ identifier: 'string', entityId: 123 });
    } catch(err) {
      expect(err.message).to.match(/string/);
      return;
    }
    throw new Error('Should not succeed');
  });

  it('can get and set by identifier', () => {
    const entity = { identifier: 'ident', entityId: 'ent' };
    entities.add(entity);
    const result = entities.get('ident');
    expect(result).to.equal(entity);
  });

  it('can get and set by entityId', () => {
    const entity = { identifier: 'ident', entityId: 'ent' };
    entities.add(entity);
    const result = entities.getByEntityId('ent');
    expect(result).to.equal(entity);
  });

});
