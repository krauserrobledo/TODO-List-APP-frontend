import { Observable } from 'rxjs';

/**
 * A generic interface for use cases that transform input of type S to output of type T.
 * @template S - The input type.
 * @template T - The output type.
 */
export interface UseCase<S, T> {
    execute(params: S): Observable<T>;
}
