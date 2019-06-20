import { expect } from 'chai';
import fs from 'fs';

import cg from '../cg';

const {
  getAvatarByUserIdMethod,
} = cg();

const mockRes = {
  status: (code: any) => ({send: (data: any) => data}),
  send: (data: any) => data,
};



describe('getAvatarByUserIdMethod', function() {

  // @ts-ignore
  context('when userId is not provided', function() {
    it('returns a validation error', function() {
      // @ts-ignore
      return getAvatarByUserIdMethod({}, mockRes)
        .then((res: any) => {
          expect(res.code).to.eql(400);
        });
    });
  });

    // @ts-ignore
    context('when userId is provided', function() {
      context('when the image has not been stored yet', function() {
        // tslint:disable-next-line
        it('saves and returns the base64 encoded image from the url', function() {
          // @ts-ignore
          return getAvatarByUserIdMethod({ params: { userId: '1' } }, mockRes)
            .then((res: any) => {
              expect(fs.existsSync('1')).to.be.equal(true);
              expect(res).to.be.a('string');
            });
        });
      });
      context('when the image has been stored', function() {
        it('returns the base64 encoded image from the saved file', function() {
          // @ts-ignore
          return getAvatarByUserIdMethod({ params: { userId: '1' } }, mockRes)
            .then((res: any) => {
              expect(res).to.be.a('string');
            });
        });
      });

    });

});
