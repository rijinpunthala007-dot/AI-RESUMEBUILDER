import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                // Clone the fallback element and pass the error as a prop or child if possible, 
                // but for now, let's just append the error message to a new div if the fallback is a simple element.
                // Or better, ignore the custom fallback for now to ensure we see the error, 
                // OR wrap the fallback with the error message.
                return (
                    <div className="flex flex-col gap-2">
                        {this.props.fallback}
                        <div className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200 font-mono whitespace-pre-wrap">
                            Debug Error: {this.state.error && this.state.error.toString()}
                        </div>
                    </div>
                );
            }
            return (
                <div className="text-red-500 p-4 border border-red-300 rounded bg-red-50">
                    <p className="font-bold">Something went wrong:</p>
                    <pre className="text-xs mt-2 whitespace-pre-wrap">{this.state.error && this.state.error.toString()}</pre>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
