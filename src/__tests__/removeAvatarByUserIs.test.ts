import { expect } from 'chai';
import fs from 'fs';

import cg from '../cg';

const {
  removeAvatarByUserIdMethod,
} = cg();

const mockRes = {
  status: (code: any) => ({send: (data: any) => data}),
  send: (data: any) => data,
};



describe('removeAvatarByUserIdMethod', function() {

  // @ts-ignore
  context('when userId is not provided', function() {
    it('returns a validation error', function() {
      // @ts-ignoree
      return removeAvatarByUserIdMethod({}, mockRes)
        .then((res: any) => {
          expect(res.code).to.eql(400);
        });
    });
  });

    // @ts-ignore
  context('when userId is provided', function() {
    context('when the image has not been stored yet', function() {
      it('returns an error as the file is not found', function() {
        return removeAvatarByUserIdMethod(
          // @ts-ignore
          { params: { userId: '2' } },
          mockRes,
        )
          .then((res: any) => {
            expect(fs.existsSync('2')).to.be.equal(false);
            expect(res).to.be.a('object');
            expect(res).to.have.keys('code', 'message');
          });
      });
    });
    context('when the image has been stored', function() {
      it('deletes the stored file', function() {
        return removeAvatarByUserIdMethod(
          // @ts-ignore
          { params: { userId: '1' } },
          mockRes,
          )
          .then((res: any) => {
            expect(fs.existsSync('1')).to.be.equal(false);
            expect(res).to.be.a('string');
            expect(res).to.contain('Deleted avatar for user');
          });
      });
    });

  });

});
