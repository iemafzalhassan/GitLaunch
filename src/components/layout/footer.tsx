import { Heart, Github, Linkedin, Twitter, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Main footer content */}
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
              <span>by</span>
              <a
                href="https://github.com/iemafzalhassan"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                Md. Afzal Hassan Ehsani
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/iemafzalhassan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="group"
              >
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0 group-hover:bg-muted/80 transition-colors">
                  <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </a>

              <a
                href="https://linkedin.com/in/iemafzalhassan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="group"
              >
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0 group-hover:bg-blue-500/10 transition-colors">
                  <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform group-hover:text-blue-500" />
                </Button>
              </a>

              <a
                href="https://twitter.com/iemafzalhassan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
                className="group"
              >
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0 group-hover:bg-sky-500/10 transition-colors">
                  <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform group-hover:text-sky-500" />
                </Button>
              </a>
            </div>
          </div>

          {/* Project description */}
          <div className="text-center text-sm text-muted-foreground max-w-2xl">
            <p>
              Generate professional GitHub README profiles with AI-powered quotes,
              multiple icon services, and live preview functionality.
            </p>
          </div>

          {/* License and project info */}
          <div className="flex flex-col lg:flex-row items-center gap-6 text-xs text-muted-foreground">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-4">
                <span>© 2025 GitLaunch</span>
                <span>•</span>
                <a
                  href="https://github.com/iemafzalhassan/GitLaunch/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  MIT License
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="hidden lg:block">•</div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/iemafzalhassan/GitLaunch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  View Source
                  <ExternalLink className="h-3 w-3" />
                </a>
                <span>•</span>
                <a
                  href="https://github.com/iemafzalhassan/GitLaunch/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Report Issues
                  <ExternalLink className="h-3 w-3" />
                </a>
                <span>•</span>
                <a
                  href="https://github.com/iemafzalhassan/GitLaunch/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Discussions
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}