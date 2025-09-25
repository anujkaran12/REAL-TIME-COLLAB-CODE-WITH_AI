import {v2} from "cloudinary";

v2.config({
  cloud_name: "dpnk0pqxd",
  api_key: "494536979267618",
  api_secret: "VoJl5D93SrCYWdMFS0Gwi-xUzd0",
});

export const uploadCloudinary = async (avatarUrl:string) => {
  try {
    

    const result = await v2.uploader.upload(avatarUrl, {
      folder: "avatars",
    });
    return result;

    
  } catch (error) {
    console.log(error)
    return null
  }
};
