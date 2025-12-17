/**
 * A generic abstract class for mapping between two types.
 * @template I - The input type.
 * @template O - The output type.
 */
export abstract class Mapper<I, O> {
    abstract mapFrom(param: I): O;
    abstract mapTo(param: O): I;
}
