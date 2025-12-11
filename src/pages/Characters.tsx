import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { CharacterCard } from "@/components/CharacterCard";
import { SearchBar } from "@/components/SearchBar";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/PageHeader";
import { CharacterModal } from "@/components/CharacterModal";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Loader2 } from "lucide-react";

interface Character {
  id: number;
  name: string;
  portrait_path: string;
  gender?: string;
  occupation?: string;
  status?: string;
  age?: number;
  birthdate?: string;
  phrases?: string[];
}

interface ApiResponse {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
  results: Character[];
}

export default function Characters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchCharacters = useCallback(async (pageNum: number, isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      const res = await fetch(`https://thesimpsonsapi.com/api/characters?page=${pageNum}`);
      const data: ApiResponse = await res.json();

      if (isInitial) {
        setCharacters(data.results || []);
        setTotalCount(data.count);
      } else {
        setCharacters(prev => [...prev, ...(data.results || [])]);
      }

      setHasMore(data.next !== null);
    } catch (err) {
      console.error("Error fetching characters:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchCharacters(1, true);
  }, [fetchCharacters]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCharacters(nextPage);
    }
  }, [page, loadingMore, hasMore, fetchCharacters]);

  const { loadMoreRef } = useInfiniteScroll(loadMore, hasMore, loadingMore);

  const filteredCharacters = search
    ? characters.filter((char) =>
        char.name.toLowerCase().includes(search.toLowerCase())
      )
    : characters;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <PageHeader
          title="Personajes"
          subtitle="Descubre todos los personajes del universo de Los Simpsons"
          icon="👥"
        />

        <div className="flex justify-center mb-8">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar personaje..."
          />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <p className="text-center text-muted-foreground mb-6 font-body">
              {search 
                ? `Mostrando ${filteredCharacters.length} resultados`
                : `Mostrando ${characters.length} de ${totalCount} personajes`
              }
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {filteredCharacters.map((character, index) => (
                <div
                  key={`${character.id}-${index}`}
                  className="animate-bounce-in"
                  style={{ animationDelay: `${(index % 20) * 30}ms` }}
                >
                  <CharacterCard
                    character={{
                      ...character,
                      image: `https://cdn.thesimpsonsapi.com/500${character.portrait_path}`
                    }}
                    onClick={() => setSelectedCharacter(character)}
                  />
                </div>
              ))}
            </div>

            {/* Infinite scroll trigger */}
            {!search && hasMore && (
              <div ref={loadMoreRef} className="flex justify-center py-8">
                {loadingMore && (
                  <div className="flex items-center gap-3 bg-primary/10 rounded-full px-6 py-3">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    <span className="font-heading text-foreground">Cargando más personajes...</span>
                  </div>
                )}
              </div>
            )}

            {!hasMore && !search && characters.length > 0 && (
              <div className="text-center py-8">
                <span className="text-4xl mb-2 block">🎉</span>
                <p className="text-muted-foreground font-body">
                  ¡Has visto todos los {totalCount} personajes!
                </p>
              </div>
            )}
          </>
        )}

        <CharacterModal 
          character={selectedCharacter} 
          onClose={() => setSelectedCharacter(null)} 
        />
      </main>
    </div>
  );
}
