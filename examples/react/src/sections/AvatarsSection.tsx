import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage
} from "pds";

const avatarImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%234F55F1'/%3E%3Ccircle cx='40' cy='32' r='16' fill='%23fff' fill-opacity='.88'/%3E%3Cpath d='M14 72c4-18 16-28 26-28s22 10 26 28' fill='%23fff' fill-opacity='.88'/%3E%3C/svg%3E";

export function AvatarsSection() {
  return (
    <section className="examples-section" aria-labelledby="avatars-title">
      <div className="examples-section-heading">
        <h2 id="avatars-title">Avatar</h2>
        <p>
          Image, fallback, sizes, status badge, grouped avatars, and overflow
          count.
        </p>
      </div>

      <div className="examples-grid">
        <div className="examples-panel">
          <h3>Image and fallback</h3>
          <div className="examples-row">
            <Avatar>
              <AvatarImage alt="Pedro" src={avatarImage} />
              <AvatarFallback>PC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>Long fallback label</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="examples-panel">
          <h3>Sizes and status</h3>
          <div className="examples-row">
            <Avatar size="sm">
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar size="md">
              <AvatarFallback>MD</AvatarFallback>
              <AvatarBadge aria-label="Online" />
            </Avatar>
            <Avatar size="lg">
              <AvatarImage alt="Design systems" src={avatarImage} />
              <AvatarFallback>LG</AvatarFallback>
              <AvatarBadge aria-label="Active" />
            </Avatar>
          </div>
        </div>

        <div className="examples-panel examples-panel-wide">
          <h3>Group and overflow count</h3>
          <AvatarGroup aria-label="Reviewers">
            <Avatar>
              <AvatarImage alt="Pedro" src={avatarImage} />
              <AvatarFallback>PC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+4</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </div>
    </section>
  );
}
