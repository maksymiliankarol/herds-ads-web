import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { deleteAd, listAds } from "../lib/ads";

export default function Ads() {
  const navigate = useNavigate();
  const [ads, setAds] = useState(listAds);

  function remove(id: string) {
    deleteAd(id);
    setAds(listAds());
  }

  return (
    <section className="page width-lg column">
      <Link to="/">Back</Link>
      <p>Your ads.</p>
      {ads.length === 0 ? (
        <p></p>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="fit">Updated</th>
              <th>Title</th>
              <th>Published</th>
              <th className="fit"></th>
              <th className="fit"></th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad.id}>
                <td className="fit">{new Date(ad.updated).toLocaleDateString()}</td>
                <td>
                  <Link to={`/editor/${ad.id}`}>{ad.title || "Untitled"}</Link>
                </td>
                <td>
                  {ad.published.length === 0 ? (
                    "-"
                  ) : (
                    <table>
                      <tbody>
                        {ad.published.map((p, i) => (
                          <tr key={i}>
                            <td>{p.city}</td>
                            <td>{p.room}</td>
                            <td>{new Date(p.at).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </td>
                <td className="fit">
                  <button 
                    type="button" 
                    onClick={() => navigate(`/publish/${ad.id}`)}
                    className="link"
                  >
                    Publish
                  </button>
                </td>
                <td className="fit">
                  <button 
                    type="button" 
                    onClick={() => remove(ad.id)}
                    className="delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to={`/editor/${crypto.randomUUID()}`}>
        New
      </Link>
    </section>
  );
}