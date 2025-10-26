#!/usr/bin/env python3
"""
Generate detail images for each project subpage
"""
import requests
import base64
from pathlib import Path
import time

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
                'size': '4:3'
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
    """Generate all detail images for project subpages"""

    print("=" * 80)
    print("🎨 Generating Project Detail Images")
    print("=" * 80)

    images = [
        # Kenya - Motif's Afrobeats Catalog
        {
            'filename': 'kenya-motif-detail-1.png',
            'prompt': """Photorealistic image of Kenyan music producer's home studio equipment close-up.
            MIDI keyboard, audio interface with glowing LED meters, studio monitors with foam isolation pads.
            Natural afternoon lighting through window. Authentic home studio in Nairobi apartment.
            Professional music production gear but modest setup. Documentary photography style, 8K quality."""
        },
        {
            'filename': 'kenya-motif-detail-2.png',
            'prompt': """Photorealistic image of Spotify analytics dashboard on laptop screen showing streaming revenue.
            African music producer's hands typing on keyboard, colorful charts showing monthly streams and earnings.
            Natural window light on laptop screen. Nairobi home office environment.
            Documentary photography, editorial quality similar to music industry journalism."""
        },

        # USA - Brooklyn Hip-Hop Producer
        {
            'filename': 'brooklyn-detail-1.png',
            'prompt': """Photorealistic close-up of white hip-hop producer's hands working on MPC drum machine.
            Fingers pressing colorful pads, professional studio environment in background with exposed brick.
            Natural studio lighting, professional music equipment. Brooklyn NYC aesthetic.
            8K quality, editorial photography style similar to Complex or Billboard studio photography."""
        },
        {
            'filename': 'brooklyn-detail-2.png',
            'prompt': """Photorealistic image of professional recording studio vocal booth through glass window.
            Microphone on shock mount, acoustic foam panels on walls. White producer visible outside booth at mixing console.
            Industrial Brooklyn studio lighting, professional music production environment.
            Documentary photography, high-end studio aesthetic, 8K quality."""
        },

        # Brazil - MC Favela
        {
            'filename': 'brazil-detail-1.png',
            'prompt': """Photorealistic image of smartphone showing TikTok analytics with viral video statistics.
            Brazilian funk artist's hands holding phone, colorful favela buildings visible in background through window.
            Natural golden hour lighting. Social media metrics showing hundreds of thousands of views.
            Documentary photography, authentic Brazilian favela environment, 8K quality."""
        },
        {
            'filename': 'brazil-detail-2.png',
            'prompt': """Photorealistic image of makeshift recording setup in Rio favela.
            Microphone on stand, laptop with music software, colorful favela community visible through window.
            Brazilian funk artist (Latino) recording vocals. Vibrant authentic favela aesthetic.
            Natural lighting, documentary photography style, photojournalism quality, 8K."""
        }
    ]

    results = []

    for img in images:
        result = generate_image(img['prompt'], img['filename'])
        results.append(result)
        print(result['message'])

        if img != images[-1]:
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
        print(f"   • {Path(r['filename']).name} ({r.get('size_kb', 0)} KB)")

    if failed:
        print(f"\n❌ Failed: {len(failed)}/{len(results)}")
        for r in failed:
            print(f"   • {r['filename']}: {r['message']}")

    print("\n" + "=" * 80)
    print(f"✓ Complete! Generated {len(successful)} detail images")
    print("=" * 80)

if __name__ == "__main__":
    main()
