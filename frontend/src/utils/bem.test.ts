import bem from './bem';

describe('bem', () => {
    const { bemBlock, bemElement } = bem('test-class');

    describe('block builder', () => {
        it('builds the correct class without modifiers', () => {
            expect(bemBlock()).toEqual('test-class');
        });

        it.each`
            modifiers                     | expectedClass
            ${{ big: true, red: true }}   | ${'test-class test-class--big test-class--red'}
            ${{ big: true, red: false }}  | ${'test-class test-class--big'}
            ${{ big: false, red: false }} | ${'test-class'}
        `('builds the correct class with modifiers', ({ modifiers, expectedClass }) => {
            expect(bemBlock(modifiers)).toEqual(expectedClass);
        });
    });

    describe('element builder', () => {
        it('build the correct class without modifiers', () => {
            expect(bemElement('element')).toEqual('test-class__element');
        });

        it.each`
            modifiers                     | expectedClass
            ${{ big: true, red: true }}   | ${'test-class__element test-class__element--big test-class__element--red'}
            ${{ big: true, red: false }}  | ${'test-class__element test-class__element--big'}
            ${{ big: false, red: false }} | ${'test-class__element'}
        `('builds the correct class with modifiers', ({ modifiers, expectedClass }) => {
            expect(bemElement('element', modifiers)).toEqual(expectedClass);
        });
    });
});
