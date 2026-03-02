namespace Portfolio.Domain.Interfaces;

public interface IFileStorageService
{
    Task<string> UploadAsync(Stream fileStream, string fileName, CancellationToken ct = default);
    Task DeleteAsync(string publicId, CancellationToken ct = default);
}
