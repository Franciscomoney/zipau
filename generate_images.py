#!/usr/bin/env python3
"""
Generate photorealistic images for Zipa lending platform using Nano Banana service
"""
import requests
import base64
from pathlib import Path
import time

def generate_image(prompt: str, filename: str, output_dir: str = "/home/debian/DROID/zipa/public/generated") -> dict:
    """
    Generate an image using the Nano Banana service and save it.

    Args:
        prompt: Description of the image to generate
        filename: Name for the output file (e.g., "kenya-motif.webp")
        output_dir: Directory to save the image

    Returns:
        dict with success status and details
    """
    try:
        print(f"\n🎨 Generating: {filename}")
        print(f"   Prompt: {prompt[:80]}...")

        # Make request to nano-banana service with raw=true for photorealistic images
        response = requests.post(
            'http://51.178.253.51:2023/generate-image',
            json={
                'prompt': prompt,
                'count': 1,
                'raw': True,  # Use raw mode for photorealistic images
                'size': '16:9'  # Wide format for hero images
            },
            timeout=60
        )

        data = response.json()

        # Check for errors
        if 'error' in data:
            return {
                'success': False,
                'filename': filename,
                'message': f"❌ Generation failed: {data['error']}"
            }

        # Extract and save image
        if 'images' in data and len(data['images']) > 0:
            image_b64 = data['images'][0]['b64_json']
            image_bytes = base64.b64decode(image_b64)

            # Ensure output directory exists
            Path(output_dir).mkdir(parents=True, exist_ok=True)

            # Save to file (convert to PNG first, then can convert to webp if needed)
            output_path = Path(output_dir) / filename.replace('.webp', '.png')
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

    except requests.exceptions.Timeout:
        return {
            'success': False,
            'filename': filename,
            'message': "❌ Request timed out (>60s)"
        }
    except Exception as e:
        return {
            'success': False,
            'filename': filename,
            'message': f"❌ Error: {str(e)}"
        }

def main():
    """Generate all images for Zipa lending platform"""

    print("=" * 80)
    print("🎨 ZIPA Image Generation - Photorealistic IP-Backed Lending")
    print("=" * 80)

    # Define all images to generate
    images = [
        {
            'filename': 'kenya-motif-afrobeats.png',
            'prompt': """Photorealistic image of a young Kenyan music producer in a home recording studio in Nairobi.
            Professional but modest setup with MIDI keyboard, audio interface, studio monitors, and laptop showing DAW software.
            Natural lighting through window, warm African aesthetic. Producer is focused on creating music, wearing casual modern clothing.
            Background shows Nairobi cityscape through window. Studio has colorful African textiles on walls for acoustic treatment.
            Realistic photography style like editorial music magazine, vibrant and authentic. 8K quality, natural colors, documentary photography style.
            Similar to professional music journalism photography from publications like NPR Music or The FADER."""
        },
        {
            'filename': 'usa-brooklyn-hiphop-producer.png',
            'prompt': """Photorealistic image of a Brooklyn hip-hop music producer in a professional home studio.
            High-end equipment: large mixing console, multiple studio monitors, MPC drum machine, vintage synthesizers, vocal booth visible in background.
            Producer working at the mixing desk, focused on mixing a track. Urban Brooklyn aesthetic with exposed brick walls and industrial lighting.
            Natural window light mixed with studio LED strips. Producer wearing streetwear (hoodie, chain).
            Professional music studio photography style, magazine quality, authentic NYC hip-hop culture.
            8K quality, cinematic lighting, editorial photography similar to Complex Magazine or Billboard studio features."""
        },
        {
            'filename': 'brazil-mc-favela-funk.png',
            'prompt': """Photorealistic image of a Brazilian funk (funk carioca) artist in a vibrant Rio de Janeiro favela setting.
            Young MC with microphone in hand, colorful favela houses cascading on hillside in background. Natural outdoor setting with golden hour lighting.
            Artist wearing trendy Brazilian streetwear - colorful patterns, gold jewelry, fresh sneakers. Authentic favela community visible.
            Urban Brazilian culture, energetic and vibrant atmosphere. Street photography style, documentary realism.
            8K quality, natural lighting, photojournalism aesthetic similar to work published in National Geographic or Vice photo essays on Brazilian music culture."""
        },
        {
            'filename': 'hero-artist-working-1.png',
            'prompt': """Photorealistic wide shot of a diverse music artist in a modern recording studio.
            Professional equipment, natural lighting, focused creative energy. Artist wearing headphones, working on music production.
            Warm cinematic lighting, editorial photography quality. Global creative professional aesthetic.
            8K quality, shallow depth of field, magazine cover photography style. Similar to Spotify editorial photography."""
        },
        {
            'filename': 'hero-artist-working-2.png',
            'prompt': """Photorealistic image of a female singer-songwriter in a cozy home studio.
            Acoustic guitar, microphone, laptop with recording software. Warm natural window light, plants in background.
            Authentic indie musician aesthetic, comfortable creative space. Professional photography.
            8K quality, natural colors, editorial music photography similar to NPR Tiny Desk aesthetic."""
        },
        {
            'filename': 'hero-global-artists-collage.png',
            'prompt': """Photorealistic collage-style image showing diverse musicians from different countries working on their craft.
            Split composition showing: African producer with laptop, Latin American artist with microphone, Asian musician with traditional instruments mixed with modern tech.
            Global diversity in music creation, authentic documentary photography style. Natural lighting, candid moments.
            8K quality, photojournalism aesthetic, celebrating global creative economy. Similar to UNESCO cultural photography or World Music Network editorial content."""
        }
    ]

    results = []

    for img in images:
        result = generate_image(img['prompt'], img['filename'])
        results.append(result)
        print(result['message'])

        # Add delay between requests to avoid overwhelming the service
        if img != images[-1]:  # Don't wait after last image
            print("   ⏳ Waiting 3 seconds before next generation...")
            time.sleep(3)

    # Print summary
    print("\n" + "=" * 80)
    print("📊 GENERATION SUMMARY")
    print("=" * 80)

    successful = [r for r in results if r['success']]
    failed = [r for r in results if not r['success']]

    print(f"\n✅ Successful: {len(successful)}/{len(results)}")
    for r in successful:
        print(f"   • {r['filename']} ({r.get('size_kb', 0)} KB)")

    if failed:
        print(f"\n❌ Failed: {len(failed)}/{len(results)}")
        for r in failed:
            print(f"   • {r['filename']}: {r['message']}")

    print("\n" + "=" * 80)
    print(f"✓ Complete! Generated {len(successful)} images")
    print("=" * 80)

if __name__ == "__main__":
    main()
