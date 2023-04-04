package charlotte.commons;

public class ErrorOrWarning extends RuntimeException {

	public ErrorOrWarning() {
		super();
	}

	public ErrorOrWarning(Throwable e) {
		super(e);
	}
}
