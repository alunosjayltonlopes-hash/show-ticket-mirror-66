import { Card } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";

const ManifestoVideo = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Card className="p-8">
        <div className="max-w-4xl mx-auto">
          <AspectRatio ratio={16 / 9}>
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Manifesto Musical - Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </AspectRatio>
        </div>
      </Card>
    </div>
  );
};

export default ManifestoVideo;
