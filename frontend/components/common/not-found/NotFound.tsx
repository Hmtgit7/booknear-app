import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface CommonNotFoundProps {
  homeHref?: string;
  faqHref?: string;
}

export function CommonNotFound({ homeHref = '/', faqHref = '/#faq' }: CommonNotFoundProps) {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <p className="text-8xl font-bold text-teal-600">404</p>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">Page not found</h1>

        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="rounded-full bg-teal-600 hover:bg-teal-700 text-white px-7">
            <a href={homeHref}>
              <ArrowLeft size={16} className="mr-2" aria-hidden="true" />
              Back to Home
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="rounded-full border-gray-200 text-gray-600 hover:border-teal-600 hover:text-teal-600 px-7"
          >
            <a href={faqHref}>View FAQ</a>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default CommonNotFound;
