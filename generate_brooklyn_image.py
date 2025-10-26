#!/usr/bin/env python3
"""
Regenerate Brooklyn producer image with white artists for diversity
"""
import requests
import base64
from pathlib import Path

def generate_image(prompt: str, filename: str, output_dir: str = "/home/debian/DROID/zipa/public/generated") -> dict:
    """Generate an image using the Nano Banana service and save it."""
    try:
        print(f"\n🎨 Generating: {filename}")
        print(f"   Prompt: {prompt[:80]}...")

        response = requests.post(
            'http://51.178.253.51:2023/generate-image',
            json={
                'prompt': prompt,
                'count': 1,
                'raw': True,
                'size': '16:9'
            },
            timeout=60
        )

        data = response.json()

        if 'error' in data:
            return {
                'success': False,
                'filename': filename,
                'message': f"❌ Generation failed: {data['error']}"
            }

        if 'images' in data and len(data['images']) > 0:
            image_b64 = data['images'][0]['b64_json']
            image_bytes = base64.b64decode(image_b64)

            Path(output_dir).mkdir(parents=True, exist_ok=True)
            output_path = Path(output_dir) / filename
            output_path.write_bytes(image_bytes)

            return {
                'success': True,
                'filename': str(output_path),
                'message': f"✓ Image saved to {output_path}",
                'size_kb': len(image_bytes) // 1024
            }
        else:
            return {
                'success': False,
                'filename': filename,
                'message': "❌ No images in response"
            }

    except Exception as e:
        return {
            'success': False,
            'filename': filename,
            'message': f"❌ Error: {str(e)}"
        }

def main():
    """Regenerate Brooklyn producer image with white artists"""

    print("=" * 80)
    print("🎨 Regenerating Brooklyn Producer Image - Diverse Representation")
    print("=" * 80)

    prompt = """Photorealistic image of a white hip-hop music producer in a professional home studio in Brooklyn.
    Young white male or female producer (Caucasian) working at a high-end mixing console with multiple studio monitors.
    Professional equipment: MPC drum machine, vintage synthesizers, vocal booth visible in background.
    Producer focused on mixing at the desk, wearing casual streetwear (hoodie, cap).
    Urban Brooklyn aesthetic with exposed brick walls and industrial lighting.
    Natural window light mixed with studio LED strips. Modern professional music production setup.
    8K quality, cinematic lighting, editorial photography style similar to Complex Magazine or Billboard studio features.
    Authentic NYC hip-hop culture representation with diverse demographic."""

    result = generate_image(prompt, 'usa-brooklyn-hiphop-producer.png')
    print(result['message'])

    print("\n" + "=" * 80)
    if result['success']:
        print(f"✓ Complete! Image regenerated ({result.get('size_kb', 0)} KB)")
    else:
        print("❌ Failed to regenerate image")
    print("=" * 80)

if __name__ == "__main__":
    main()
