import Image from "next/image";
import type { Shot } from "@/lib/work";

/**
 * A desktop browser window frame with the capture inside.
 */
export function BrowserFrame({
  shot,
  url,
  priority = false,
}: {
  shot: Shot;
  url: string;
  priority?: boolean;
}) {
  return (
    <figure className="browser-frame">
      <div className="browser-bar" aria-hidden="true">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-url">{url}</span>
      </div>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes="(min-width: 1024px) 900px, 92vw"
        className="block h-auto w-full"
        priority={priority}
      />
    </figure>
  );
}

/**
 * A phone frame, used as the floating secondary capture.
 */
export function PhoneFrame({ shot }: { shot: Shot }) {
  return (
    <figure className="phone-frame">
      <div className="phone-screen">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes="220px"
          className="block h-auto w-full"
        />
      </div>
    </figure>
  );
}
