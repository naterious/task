import { expect } from 'chai';

import cg from '../cg';

const {
  getUserByIdMethod,
} = cg();

const mockRes = {
  status: (code: any) => ({send: (data: any) => data}),
  send: (data: any) => data,
};



describe('getUserById', function() {

  // @ts-ignore
  context('when userId is not provided', function() {
    it('returns a validation error', function() {
      // @ts-ignore
      return getUserByIdMethod({}, mockRes)
        .then((res: any) => {
          expect(res.code).to.eql(400);
        });
    });
  });

    // @ts-ignore
  context('when userId is provided', function() {
    it('returns the user details', function() {
      // @ts-ignore
      return getUserByIdMethod({ params: { userId: '1' } }, mockRes)
        .then((res: any) => {
          expect(res).to.have.keys('data');
          expect(res.data).to.have.keys(
            'id',
            'email',
            'first_name',
            'last_name',
            'avatar',
          );
        });
    });
  });

});
