import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error?.message || 'Something went wrong.',
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-dvh w-full bg-[#FFF8E7] flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-3xl bg-white border-4 border-[#1A1A2E] shadow-[0_8px_0_#1A1A2E] p-6 text-center flex flex-col items-center gap-4">
            <h2 className="font-display text-2xl font-bold text-[#1A1A2E]">
              Oops! Let&apos;s Try Again
            </h2>
            <p className="text-sm font-bold text-[#1A1A2E]/70 break-words max-w-full">
              {this.state.message}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="min-h-[56px] px-6 rounded-2xl bg-[#3CD62F] border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] font-display text-lg font-bold text-white cursor-pointer"
            >
              Reload Splash Zoo
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
