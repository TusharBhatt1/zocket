export interface ImageDataProps {
    caption: {
      text: string;
      position: { x: number; y: number };
      max_characters_per_line: number;
      font_size: number;
      alignment: string;
      text_color: string;
    };
    cta: {
      text: string;
      position: { x: number; y: number };
      text_color: string;
      background_color: string;
    };
    image_mask: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    urls: {
      mask: string;
      stroke: string;
      design_pattern: string;
    };
  }
  