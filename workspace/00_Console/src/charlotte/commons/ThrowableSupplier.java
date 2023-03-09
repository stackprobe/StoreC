package charlotte.commons;

public interface ThrowableSupplier<T> {
	public T get() throws Exception;
}
