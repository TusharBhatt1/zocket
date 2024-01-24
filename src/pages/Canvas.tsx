import { useRef, useState, useEffect } from "react";
import { CiStar } from "react-icons/ci";
import { FiUpload } from "react-icons/fi";
import Select from "../components/Select";
import Input from "../components/Input";
import Button from "../components/Button";
import { ImageDataProps } from "../type";
import ColorPicker from "../components/ColorPicker";
import Lottie from "lottie-react";
import animatedData from "../../public/Animation - 1706111791148.json";

const jsonData =
  '{"caption":{"text":"1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs","position":{"x":500,"y":50},"max_characters_per_line":31,"font_size":24,"alignment":"center","text_color":"#FFFFFF"},"cta":{"text":"Shop Now","position":{"x":190,"y":320},"text_color":"#000000","background_color":"#FFD700"},"image_mask":{"x":56,"y":442,"width":970,"height":600},"urls":{"mask":"https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png","stroke":"https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png","design_pattern":"https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png"}}';
const templateData: ImageDataProps = JSON.parse(jsonData);

const uniquePoints = [
  "Technology stacks : React + Typescript + Tailwind",
  "Additional feature to Download the canvas",
  "Replication of the given web page",
  "Code Splitting",
  "Clean code and Best Practices",
];

export default function Canvas() {
  const [showIntro, setShowIntro] = useState(true);
  const [showContinue, setShowContinue] = useState(false);
  const [canvasState, setCanvasState] = useState({
    image: null as HTMLImageElement | null,
    isBold: false,
    isItalic: false,
    selectedTextColor: "black",
    selectedFontSize: templateData.caption.font_size,
    editedText: templateData.caption.text,
    selectedBackgroundColor: "#FFFFFF",
    selectedCTAText: templateData.cta.text,
    buttonSize: 12,
    theme: templateData.cta.background_color,
    fontStyle: "sans-serif",
    isImageUploaded: false,
  });

  const canvasHeight = 400;
  const canvasWidth = 500;
  const canvasImageHeight = 350;
  const canvasImageWidth = 400;
  const lineHeight = 1.2;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImage = (input) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        setCanvasState((prevState) => ({
          ...prevState,
          image: img,
          isImageUploaded: true,
        }));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(input.files[0]);
  };

  const setCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context && canvasState.image) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = canvasState.selectedBackgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);

      const { cta } = templateData;

      context.save();
      const centerX = canvas.width / 2;
      const centerY =
        canvasImageHeight + (canvasHeight - canvasImageHeight) / 2;

      context.translate(centerX, centerY);
      context.rotate((20 * Math.PI) / 180);

      context.fillStyle = canvasState.theme;
      context.fillRect(
        -canvas.width / 2,
        -canvasImageHeight,
        canvas.width,
        canvas.height - canvasImageHeight
      );

      context.restore();

      context.drawImage(
        canvasState.image,
        180,
        10,
        canvasImageWidth,
        canvasImageHeight
      );

      if (canvasState.isImageUploaded) {
        context.fillStyle = canvasState.selectedTextColor;
        const captionFontStyle = `${canvasState.isBold ? "bold " : ""}${
          canvasState.isItalic ? "italic " : ""
        }${canvasState.selectedFontSize}px ${canvasState.fontStyle}`;
        context.font = captionFontStyle;
        context.textAlign = "center";
        context.textBaseline = "middle";

        const captionX = canvasWidth / 2;
        const captionY = 450;

        const maxWidth = canvasWidth - 20; // Updated maxWidth
        wrapText(
          context,
          canvasState.editedText,
          captionX,
          captionY,
          maxWidth,
          canvasState.selectedFontSize,
          lineHeight
        );

        context.fillStyle = canvasState.theme;
        context.strokeStyle = cta.text_color;
        context.lineWidth = 2;
        context.font = `${canvasState.buttonSize}px ${canvasState.fontStyle}`;
        context.textAlign = "center";

        const buttonWidth =
          context.measureText(canvasState.selectedCTAText).width + 20;
        const buttonHeight = canvasState.buttonSize + 10;

        const buttonX = (canvasWidth * 3.5) / 3;
        const buttonY = 450;

        context.fillRect(
          buttonX - buttonWidth / 2,
          buttonY,
          buttonWidth,
          buttonHeight
        );
        context.strokeRect(
          buttonX - buttonWidth / 2,
          buttonY,
          buttonWidth,
          buttonHeight
        );
        context.fillStyle = cta.text_color;
        context.fillText(
          canvasState.selectedCTAText,
          buttonX,
          buttonY + buttonHeight / 2
        );
      }
    }
  };
  const wrapText = (
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    fontSize: number,
    lineHeight: number
  ) => {
    const words = text.split(" ");
    let line = "";
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, currentY);
        line = words[n] + " ";
        currentY += fontSize * lineHeight;
      } else {
        line = testLine;
      }
    }

    context.fillText(line, x, currentY);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const a = document.createElement("a");
    a.href = canvas?.toDataURL() || "";
    a.download = "canvas_image.png";
    a.click();
  };

  useEffect(() => {
    setCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasState]);

  useEffect(() => {
    setTimeout(() => {
      setShowContinue(true);
    }, 1000);
  }, []);

  const handleColorSelect = (selectedColor) => {
    setCanvasState((prevState) => ({
      ...prevState,
      theme: selectedColor,
    }));
  };

  return (
    <div>
      {showIntro ? (
        <div className="flex gap-12 justify-center items-center py-12">
          <div className="flex flex-col gap-2 md:gap-7 rounded-lg shadow-xl p-12">
            <p className="text-xl font-bold">What makes it unique</p>
            {uniquePoints.map((point, index) => (
              <span key={index} className="flex items-center gap-2 ">
                <CiStar className="text-yellow-800" /> {point}
              </span>
            ))}
            <p className="font-extrabold text-2xl text-blue-700">
              By Tushar Bhatt
            </p>

            {showContinue ? (
              <button
                className="hover:bg-blue-500 hover:text-white hover:border-blue-500 animate-bounce mt-7 p-3 border border-blue-700 rounded-xl"
                onClick={() => setShowIntro(false)}
              >
                Continue
              </button>
            ) : (
              <p className="text-black">.</p>
            )}
          </div>
          <div className="h-80 w-80">
            <Lottie animationData={animatedData} />
          </div>
        </div>
      ) : (
        <div
          className={`flex justify-around items-center rounded-xl ${
            canvasState.image ? "py-0" : "py-7"
          }`}
        >
          <div>
            <canvas
              ref={canvasRef}
              height={canvasHeight * window.devicePixelRatio} //fixing blurry images
              width={canvasWidth * window.devicePixelRatio}
              style={{ width: `${canvasWidth}px`, height: `${canvasHeight}px` }}
              className="shadow-lg bg-white rounded-xl"
            />
          </div>
          <div className="flex flex-col mt-4 gap-5 justify-center w-1/3 text-black bg-slate-50 rounded-xl p-7">
            <div className="flex justify-around">
              <div className="flex justify-center items-center gap-2">
                {canvasState.image && (
                  <img
                    src={canvasState.image.src}
                    className="h-7 w-7"
                    alt="Selected"
                  />
                )}
                <label
                  htmlFor="imageInput"
                  className="cursor-pointer flex items-center gap-2 hover:text-blue-500 "
                >
                  <FiUpload size={20} /> Image
                  <input
                    type="file"
                    id="imageInput"
                    onChange={(e) => handleImage(e.target)}
                    className="hidden"
                  />
                </label>
              </div>
              <Button label="Upload" onClick={setCanvas} />
            </div>
            {canvasState.image && (
              <>
                <div className="flex gap-2">
                  <Select
                    label="Font Size"
                    value={canvasState.selectedFontSize}
                    values={[14, 16, 22, 26, 28]}
                    onChange={(e) =>
                      setCanvasState((prevState) => ({
                        ...prevState,
                        selectedFontSize: Number(e.target.value),
                      }))
                    }
                  />

                  <Select
                    values={[14, 18, 22, 26, 28]}
                    value={canvasState.buttonSize}
                    label="Button Size"
                    onChange={(e) =>
                      setCanvasState((prevState) => ({
                        ...prevState,
                        buttonSize: Number(e.target.value),
                      }))
                    }
                  />
                </div>

                <Select
                  values={["sans-serif", "monospace", "serif"]}
                  label="Font Style"
                  value={canvasState.fontStyle}
                  onChange={(e) =>
                    setCanvasState((prevState) => ({
                      ...prevState,
                      fontStyle: e.target.value,
                    }))
                  }
                />
                <div className="flex items-center gap-2">
                  <Input
                    label="Background"
                    value={canvasState.selectedBackgroundColor}
                    type="color"
                    onChange={(e) =>
                      setCanvasState((prevState) => ({
                        ...prevState,
                        selectedBackgroundColor: e.target.value,
                      }))
                    }
                  />
                  <div className="flex flex-col gap-2 text-center">
                    <p className="text-blue-500 font-bold ">Theme</p>
                    <ColorPicker onSelectColor={handleColorSelect} />
                  </div>
                  <Input
                    label="Text "
                    type="color"
                    onChange={(e) =>
                      setCanvasState((prevState) => ({
                        ...prevState,
                        selectedTextColor: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex">
                  <Input
                    label="Bold"
                    type="checkbox"
                    checked={canvasState.isBold}
                    onChange={() =>
                      setCanvasState((prevState) => ({
                        ...prevState,
                        isBold: !prevState.isBold,
                      }))
                    }
                  />
                  <Input
                    label="Italic"
                    type="checkbox"
                    checked={canvasState.isItalic}
                    onChange={() =>
                      setCanvasState((prevState) => ({
                        ...prevState,
                        isItalic: !prevState.isItalic,
                      }))
                    }
                  />
                </div>

                <Input
                  label="Caption"
                  value={canvasState.editedText}
                  type={"text"}
                  onChange={(e) =>
                    setCanvasState((prevState) => ({
                      ...prevState,
                      editedText: e.target.value,
                    }))
                  }
                />
                <Input
                  label="CTA Text"
                  type="text"
                  value={canvasState.selectedCTAText}
                  onChange={(e) =>
                    setCanvasState((prevState) => ({
                      ...prevState,
                      selectedCTAText: e.target.value,
                    }))
                  }
                />

                <Button label="Download" onClick={downloadCanvas} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
