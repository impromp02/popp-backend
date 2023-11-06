import { BadGatewayException } from '@nestjs/common';

export async function imageUrlToBlob(url: string): Promise<ArrayBuffer> {
  try {
    const response = await fetch(url);
    const blob = await response.arrayBuffer();
    return blob;
  } catch (error) {
    throw new BadGatewayException(error.message, {
      cause: error,
      description: `${error.message}: ${url}`,
    });
  }
}
