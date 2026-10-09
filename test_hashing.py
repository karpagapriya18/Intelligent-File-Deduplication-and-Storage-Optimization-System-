from pathlib import Path

from app.services.hashing import calculate_sha256


def test_calculate_sha256_identifies_identical_content(tmp_path: Path):
    first = tmp_path / "a.txt"
    second = tmp_path / "renamed.bin"
    first.write_bytes(b"same bytes, different names")
    second.write_bytes(b"same bytes, different names")

    assert calculate_sha256(first) == calculate_sha256(second)


def test_calculate_sha256_distinguishes_different_content(tmp_path: Path):
    first = tmp_path / "a.txt"
    second = tmp_path / "b.txt"
    first.write_bytes(b"one")
    second.write_bytes(b"two")

    assert calculate_sha256(first) != calculate_sha256(second)
