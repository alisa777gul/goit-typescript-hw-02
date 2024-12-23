import React from "react";
import { ImageCardProps } from "./ImageCard.types";

export default function ImageCard({ alt_description, urls }: ImageCardProps): JSX.Element {
  return (
    <div>
      <img width="180" src={urls.small} alt={alt_description} />
    </div>
  );
}
