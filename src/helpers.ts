import { RcFile } from "antd/es/upload";
import { ImageProps } from "next/image";
import numeral from 'numeral'

export const imageLoader: any = ({ src, width, quality }: ImageProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export const getBase64 = (file: RcFile) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

export const parseSafe = (str: any) => {
  try {
    const result = JSON.parse(str);

    return result;
  } catch (e: any) {
    return undefined;
  }
};

export const numberFormat = (value: any) => numeral(value).format("0,0[.]00");
