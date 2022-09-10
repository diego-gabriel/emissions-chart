type BemModifiers = { [modifierName: string]: boolean };

function buildWithModifiers(baseClass: string, modifiers: BemModifiers): string {
    const buildModifiedClass = ([modifierName, active]: [string, boolean]) =>
        active ? `${baseClass}--${modifierName}` : null;
    const notNull = (value: string | null) => value !== null;

    const withModifiers = Object.entries(modifiers).map(buildModifiedClass).filter(notNull);
    return [baseClass, ...withModifiers].join(' ');
}

export default function bem(className: string) {
    return {
        bemBlock: (modifiers?: BemModifiers): string => buildWithModifiers(className, modifiers || {}),
        bemElement: (element: string, modifiers?: BemModifiers): string =>
            buildWithModifiers(`${className}__${element}`, modifiers || {}),
    };
}
