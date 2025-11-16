import { ILocalModule } from "@/screens/Instructors/CourseCurriculum";
import type { ImagePickerAsset } from "expo-image-picker";
import React, { useState } from "react";

export const CreateCourseContext = React.createContext<{
  coverImg: ImagePickerAsset | null;
  promoVideo: ImagePickerAsset | null;
  title: string;
  shortDescription: string;
  setCoverImage: React.Dispatch<React.SetStateAction<ImagePickerAsset | null>>;
  setPromoVideo: React.Dispatch<React.SetStateAction<ImagePickerAsset | null>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setShortDescription: React.Dispatch<React.SetStateAction<string>>;
  modules: ILocalModule[];
  setModules: React.Dispatch<React.SetStateAction<ILocalModule[]>>;
  level: string;
  setLevel: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

function CreateCourseProvider({ children }: { children: React.ReactNode }) {
  const [coverImg, setCoverImage] = useState<ImagePickerAsset | null>(null);
  const [promoVideo, setPromoVideo] = useState<ImagePickerAsset | null>(null);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [level, setLevel] = useState("");

  const [modules, setModules] = useState<ILocalModule[]>([]);

  const value = React.useMemo(
    () => ({
      coverImg,
      setCoverImage,
      promoVideo,
      setPromoVideo,
      title,
      setTitle,
      shortDescription,
      setShortDescription,
      modules,
      setModules,
      level,
      setLevel,
    }),
    [coverImg, level, modules, promoVideo, shortDescription, title]
  );

  return (
    <CreateCourseContext.Provider value={value}>
      {children}
    </CreateCourseContext.Provider>
  );
}

export default CreateCourseProvider;

export function useCreateCourseState() {
  const context = React.useContext(CreateCourseContext);
  if (!context) {
    throw new Error(
      "useCreateCourseState must be used within a useCreateCourseState"
    );
  }
  return context;
}
